from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import Pair, DiaryEntry, Reaction
from .serializers import PairSerializer, DiaryEntrySerializer, ReactionSerializer
import random
import string

class CreateJoinPairView(APIView):
    def post(self, request):
        room_code = request.data.get('room_code')
        author_name = request.data.get('author_name')
        if room_code:
            try:
                pair = Pair.objects.get(room_code=room_code)
                return Response({
                    'pair': PairSerializer(pair).data,
                    'author_name': author_name
                })
            except Pair.DoesNotExist:
                return Response({'error': 'Room not found'}, status=404)
        else:
            code = ''.join(random.choices(string.digits, k=6))
            pair = Pair.objects.create(room_code=code)
            return Response({
                'pair': PairSerializer(pair).data,
                'author_name': author_name
            }, status=201)

class DiaryEntryListCreateView(APIView):
    def get(self, request, pair_id):
        entries = DiaryEntry.objects.filter(pair_id=pair_id)
        serializer = DiaryEntrySerializer(entries, many=True)
        return Response(serializer.data)

    def post(self, request, pair_id):
        data = request.data.copy()
        data['pair'] = pair_id
        serializer = DiaryEntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class RememberThisView(APIView):
    def get(self, request, pair_id):
        today = timezone.now()
        entries = DiaryEntry.objects.filter(pair_id=pair_id)
        memories = [
            entry for entry in entries
            if entry.created_at.month == today.month
            and entry.created_at.day == today.day
            and entry.created_at.year < today.year
        ]
        serializer = DiaryEntrySerializer(memories, many=True)
        return Response(serializer.data)

class ReactionCreateView(APIView):
    def post(self, request, entry_id):
        data = request.data.copy()
        data['entry'] = entry_id
        serializer = ReactionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
