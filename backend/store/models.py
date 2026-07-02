from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True) # e.g., "ethnic-wear"

    def __str__(self):
        return self.name

class Product(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='products')
    name=models.CharField(max_length=100)
    description=models.TextField(blank=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    image=models.ImageField(upload_to='products/')
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    phone=models.CharField(max_length=15,blank=True)
    address=models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    
class Order(models.Model):
    user=models.ForeignKey(UserProfile,on_delete=models.CASCADE,null=True,blank=True)
    created_at=models.TimeField(auto_now_add=True)
    total_amount=models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"order {self.id}"
    
class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="items")
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    price=models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    
class Cart(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())

    def __str__(self):
        return f"cart {self.id} for {self.user}"

class CartItem(models.Model):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="items")
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)

    @property
    def subtotal(self):
        return self.quantity*self.product.price

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

