from django.urls import path
from .views import (
    CreateJoinPairView,
    DiaryEntryListCreateView,
    RememberThisView,
    ReactionCreateView
)

urlpatterns = [
    path('rooms/', CreateJoinPairView.as_view(), name='create-join-pair'),
    path('entries/<int:pair_id>/', DiaryEntryListCreateView.as_view(), name='entries'),
    path('memories/<int:pair_id>/', RememberThisView.as_view(), name='memories'),
    path('reactions/<str:entry_id>/', ReactionCreateView.as_view(), name='reactions'),
]