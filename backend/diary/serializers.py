from rest_framework import serializers
from .models import Pair, DiaryEntry, Reaction

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = '__all__'

class DiaryEntrySerializer(serializers.ModelSerializer):
    reactions = ReactionSerializer(many=True, read_only=True)

    class Meta:
        model = DiaryEntry
        fields = '__all__'

class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = '__all__'