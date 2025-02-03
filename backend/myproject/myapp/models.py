from django.db import models

# Create your models here



class Turf(models.Model):
    city=models.CharField(max_length=50)
    turf_name=models.CharField(max_length=50)
    image=models.ImageField(upload_to='media/')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    available_slots = models.IntegerField(default=10)
    
    def __str__(self):
        return self.turf_name
    
class Booking(models.Model):
    turf=models.ForeignKey(Turf,related_name='bookings',on_delete=models.CASCADE)
    user_name=models.CharField(max_length=50)
    time_slot=models.CharField(max_length=50,default='default_value')
    booking_time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user_name} booked {self.time_slot}"
    
class Contact(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField()
    subject=models.CharField(max_length=200)
    message=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.subject