from django.shortcuts import render
from rest_framework import viewsets,status
from .models import *
from .serializers import *
from rest_framework.decorators import action,api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"registration sucessful"},status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class TurfViewsets(viewsets.ModelViewSet):
    queryset=Turf.objects.all()
    serializer_class=BookingSerializers
    def retrieve(self, request, *args, **kwargs):
        # Custom logic for retrieving turf details if needed
        return super().retrieve(request, *args, **kwargs)


    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def availability(self, request, pk=None):
        """ Check available slots and booked slots for a specific turf """
        turf = self.get_object()
        available_slots = turf.available_slots - turf.bookings.count()
        booked_slots = list(turf.bookings.values_list('time_slot', flat=True))
        return Response({"available_slots": available_slots, "booked_slots": booked_slots})

    @action(detail=True, methods=['post'])
    def booking(self, request, pk=None):
        """ Book a turf if slots are available """
        turf = self.get_object()
        available_slots = turf.available_slots - turf.bookings.count()
        
        if available_slots <= 0:
            return Response({"error": "No available slots for this turf"}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data
        data['turf'] = turf.id
        data['user']=request.user.id

        serializer = TurfbookingSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def contact_form(request):
    serializer=ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"youe message has been send"},status=201)
    return Response(serializer.errors,status=400)