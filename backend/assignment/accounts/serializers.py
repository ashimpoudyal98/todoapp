# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile
import logging
# UserProfile serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('phone_number', 'profile_image')

# User serializer
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()  # Nested serializer

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')

    def update(self, instance, validated_data):
        # Update User model fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        logging.warning(validated_data)

        # Update or create UserProfile fields
        profile_data = validated_data.pop('profile', {})
        
        # Get the associated UserProfile instance
        profile = instance.profile

        # Update the profile fields with provided data
        profile.phone_number = profile_data.get('phone_number', profile.phone_number)
        
        # Check if 'profile_image' is explicitly provided in profile_data
        if 'profile_image' in profile_data:
            profile.profile_image = profile_data['profile_image']
        
        profile.save()
        return instance

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'validators': []}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value
    
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long.")
        return value

    def validate_first_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("First name cannot be an empty string.")
        return value

    def validate_last_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Last name cannot be an empty string.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        UserProfile.objects.create(user=user)
        return user

# Login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")