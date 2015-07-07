
import json


from django.http import HttpResponse


def json_response(obj):
    """
    This function takes a Python object (a dictionary or a list)
    as an argument and returns an HttpResponse object containing
    the data from the object exported into the JSON format.
    """
    print ("JSON")
    return HttpResponse(json.dumps(obj), content_type="application/json")