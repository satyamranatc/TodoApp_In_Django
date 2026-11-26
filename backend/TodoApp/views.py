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
    newItem["id"] = len(newItem)+1
    todoData.append(newItem)
    return Response({
        "status":"Success!",
        "result":newItem
    })

@api_view(["PUT"])
def updateTodoItem(request,id):
    todoFound = None
    for i in range(len(todoData)):
        if todoData[i]["id"] == id:
            todoData[i].update(request.data)
            todoFound = todoData[i]
            break
    
    return Response({
        "status":"Successfuly Updated!",
        "result":todoFound
    })

@api_view(["DELETE"])
def deleteTodo(request,id):
    todoFound = None
    for i in todoData:
        if i["id"] == id:
            todoFound = i
            break

    todoData.remove(todoFound)

    return Response({
        "status":"Successfuly Deleted!",
        "result":todoData
    })

    
