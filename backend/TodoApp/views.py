from rest_framework.decorators import api_view
from rest_framework.response import Response

todoData = []

@api_view(["GET"])
def getAllTodoItems(request):
    return Response({
        "status":"Success!",
        "result":todoData
    })


@api_view(["POST"])
def addTodoItem(request):
    
    newItem = request.data
    todoData.append(newItem)
    return Response({
        "status":"Success!",
        "result":newItem
    })