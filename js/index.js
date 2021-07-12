document.addEventListener("DOMContentLoaded", (event) => {
    const btn=document.getElementById('getAll')

    function deleteitem(id){
        let url=`http://127.0.0.1:8000/healthcare/${id}`
        fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((processedRespose)=>{
            return processedRespose.json()
        }).then((data)=>{
            alert(data.message)
            AllData()
        })
    }

    function updateitem(id){
        sessionStorage.setItem('id', id)
        window.open("../src/updateForm.html","_self");
    }

    async function getAllData(){
        let url='http://127.0.0.1:8000/healthcareDict'
        let response=await fetch(url)
        let data=await response.json()
        return data
    } 

    const AllData=()=>{
        const data=getAllData()
        data.then((result)=>{
            console.log(result)
            let html=``
            result.providers.forEach(element => {
                html+=`<div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.providerID}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Name: ${element.name}</li>
                  <li class="list-group-item">Pnone no.: ${element.phone}</li>
                  <li class="list-group-item">Qualification: ${element.qualification}</li>
                  <li class="list-group-item">Speciality: ${element.speciality}</li>
                  <li class="list-group-item">isActive: ${element.active?"yes":"no"}</li>
                  <li class="list-group-item">Organization: ${element.organization}</li>
                  <li class="list-group-item">Address: ${element.address}</li>
                  <li class="list-group-item">Location: ${element.location}</li>
                </ul>
                <div class="card-body">
                <button class="btn btn-primary delete" name='${element.providerID}'>Delete</button>
                <button class="btn btn-primary update" name='${element.providerID}'>Update</button>
              </div>
              </div>`   
            });
            const ele=document.querySelector(".notNav")
            ele.innerHTML=html
        })
    }
    document.querySelector('.notNav').addEventListener('click', (event)=>{
        console.log(event.target.name)
        if(event.target.innerText == 'Delete')
            deleteitem(event.target.name)
        else if(event.target.innerText == 'Update')
            updateitem(event.target.name)
    })

    AllData()
});