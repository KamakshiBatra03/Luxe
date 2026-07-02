from rest_framework import serializers
from .models import Category,Product,Cart,CartItem
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
    categoryr=CategorySerializer(read_only=True)

    class Meta:
        model=Product
        fields='__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product_name=serializers.CharField(source="product.name",read_only=True) # it connects it to product model..i can use product serailizer within it directly also but then it will becomes nested api..so avoiding it
    product_price=serializers.DecimalField(source="product.price", max_digits=8,read_only=True,decimal_places=2)
    product_image=serializers.ImageField(source='product.image',read_only=True)

    class Meta:
        model=CartItem
        fields="__all__"

class CartSerializer(serializers.ModelSerializer):
    items=CartItemSerializer(many=True,read_only=True) #items is related name given in cartitems
    total=serializers.ReadOnlyField() # total func is called and value is stored here..its imp to give same name bec then only it will link serializer with model

    class Meta:
        model=Cart
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    password2=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','email','password','password2']

    def validate(self,data):
        if data['password']!=data['password2']:
            raise serializers.ValidationError("password do not match")
        return data
    
    def create(self,validated_data):
        username=validated_data['username']
        email=validated_data.get('email','')
        password=validated_data['password']
        user=User.objects.create_user(username=username,email=email,password=password)
        return user