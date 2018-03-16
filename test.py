import requests as req 

host = 'http://localhost:3000/api'

def productAdd():
    url = host + '/company/1/machines/products'
    data = {
        'products': [1, 2],
        'machines': [3, 4]
    }

    text = req.post(url, data=data).text 
    print(text)

productAdd()
