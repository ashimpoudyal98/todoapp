from django.db import models
from django.contrib.auth.models import User
class Todo(models.Model):
    title = models.TextField()
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos', null=True)
