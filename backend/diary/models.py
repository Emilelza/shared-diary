from django.db import models
import uuid

class Pair(models.Model):
    room_code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.room_code

class DiaryEntry(models.Model):
    MOOD_CHOICES = [
        ('😊', 'Happy'),
        ('😢', 'Sad'),
        ('😍', 'Loved'),
        ('😤', 'Frustrated'),
        ('🥰', 'Grateful'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pair = models.ForeignKey(Pair, on_delete=models.CASCADE, related_name='entries')
    author_name = models.CharField(max_length=50)
    content = models.TextField()
    mood_emoji = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class Reaction(models.Model):
    entry = models.ForeignKey(DiaryEntry, on_delete=models.CASCADE, related_name='reactions')
    reactor_name = models.CharField(max_length=50)
    emoji = models.CharField(max_length=10, default='❤️')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reactor_name} reacted to {self.entry.id}"
