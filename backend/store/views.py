from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth.models import User
from rest_framework import status
from .models import Category,Product,Cart,CartItem,Order,OrderItem,UserProfile
from .serializer import CategorySerializer,ProductSerializer,CartItemSerializer,CartSerializer,UserSerializer,RegisterSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_products(request):
    product=Product.objects.all()
    serializer=ProductSerializer(product,many=True,context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_prod(request,pk):
    product=get_object_or_404(Product, pk=pk)
    serializer=ProductSerializer(product,context={'request':request})
    return Response(serializer.data)


@api_view(['GET'])
def get_categories(request):
    category=Category.objects.all()
    serializer=CategorySerializer(category,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart,created=Cart.objects.get_or_create(user=request.user)
    serializer=CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id=request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
    cart,created=Cart.objects.get_or_create(user=request.user)
    item,created=CartItem.objects.get_or_create(cart=cart,product=product)
    if not created:
        item.quantity+=1
        item.save()
    return Response({'message':'product added to cart',"cart":CartSerializer(cart).data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id=request.data.get("item_id")
    quantity=request.data.get("quantity")

    if(not item_id or quantity is None):
        return Response({'error':'item id and quantity are required'},status=400)
    
    try:
        item=CartItem.objects.get(id=item_id)
        if int(quantity)<1:
            item.delete()
            return Response({'error':'quantity must be atleast 1'},status=400)
        item.quantity=quantity
        item.save()
        serializer=CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error':'cart item not found'},status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id=request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message':'item removed from cart'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data=request.data
        name=data.get('name')
        address=data.get('address')
        phone=data.get('phone','')
        payment_method=data.get('payment_method','COD')

        #validate phone number
        if not phone.isdigit() or len(phone)<10:
            return Response({'error':'invalid phone number'},status=400)
        
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        
        total = sum([item.product.price * item.quantity for item in cart.items.all()])

        #creating order
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        order=Order.objects.create(
            user=profile,
            total_amount=total,
        )

        #create order item
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )

        #clear cart
        cart.items.all().delete()

        return Response({"message":"order placed successfully",
                            "order_id":order.id})

    except Exception as e:
        print(f"Order Error: {e}")
        return Response({'error':str(e)},status=500)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer=RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        return Response({"message":"user created successfully","user":UserSerializer(user).data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_products_by_category(request, category_slug):
    # Filter products based on the category slug passed from React
    products = Product.objects.filter(category__slug=category_slug)
    serializer = ProductSerializer(products, many=True)
    
    # You can also send a specific banner image for this category
    category_banner = "/media/banners/" + category_slug + ".jpg"
    
    return Response({
        "products": serializer.data,
        "banner": category_banner
    })

@api_view(['GET'])
def get_category_detail(request, slug):
    # Fetch the category by slug (e.g., 'casuals')
    category = get_object_or_404(Category, slug=slug)
    
    # Fetch products belonging to this category
    products = Product.objects.filter(category=category)
    
    # Serialize data
    category_serializer = CategorySerializer(category, context={'request': request})
    product_serializer = ProductSerializer(products, many=True)
    
    return Response({
        'category': category_serializer.data,
        'products': product_serializer.data
    })