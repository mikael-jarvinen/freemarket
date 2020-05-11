from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from listings.models import Listing, User, Review, Question, FEEDBACK_CHOICES
from listings.serializers import ListingSerializer, UserSerializer, ReviewSerializer, QuestionSerializer

@csrf_exempt
def listings_list(request):
  if request.method == 'GET':
    listings = Listing.objects.all()
    serializer = ListingSerializer(listings, many=True)
    return JsonResponse(serializer.data, safe=False)

  elif request.method == 'POST':
    data = JSONParser().parse(request)
    serializer = ListingSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

def listing_detail(request, pk):
  try:
    listing = Listing.objects.get(pk=pk)
  except:
    return HttpResponse(status=404)
  
  if request.method == 'GET':
    serializer = ListingSerializer(listing)
    return JsonResponse(serializer.data)
  
  elif request.method == 'PUT':
    data = JSONParser().parse(request)
    serializer = ListingSerializer(listing, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.errors, status=400)
    return JsonResponse(serializer.errors, status=400)

  elif request.method == 'DELETE':
    listing.delete()
    return HttpResponse(status=204)