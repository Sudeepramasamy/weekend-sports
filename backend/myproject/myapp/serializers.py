from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class BookingSerializers(serializers.ModelSerializer):
    class Meta:
        model=Turf
        fields='__all__'
        
class TurfbookingSerializers(serializers.ModelSerializer):
    class Meta:
        model=Booking
        fields='__all__'
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate(self, data):
        # Ensure passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        # Remove confirm_password as it is not needed to create a user
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])
        if user:
            return user
        raise serializers.ValidationError("Invalid credentials")
        
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=Contact
        fields='__all__'
    