document.addEventListener("DOMContentLoaded", (event) => {
    const btn=document.getElementById('getAll')

    function deleteitem(id){
        console.log("delete called")
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

    function viewitem(id){
        sessionStorage.setItem('id', id)
        window.open("../src/view.html","_self");
    }

    function convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
      
        });
      
      }

    async function getAllData(){
        let url='http://127.0.0.1:8000/healthcareDict'
        let response=await fetch(url)
        let data = await response.json()
        return data
    } 

    async function getImage(providerID){
        let url=`http://127.0.0.1:8000/image/${providerID}`
        let response=await fetch(url)
        let data=await convertBlobToBase64(await response.blob())
        return data
    } 


    const AllData=()=>{
        const ele=document.querySelector(".notNav")
        const data=getAllData()
        data.then((result)=>{

            console.log(result)
            let html=``
            /*
                            <div class="card-body">
                  <h5 class="card-title">${element.providerID}</h5>
                </div>
            */
            ele.innerHTML=''
            result.providers.forEach(element => {
                getImage(element.providerID).then((responseBlob)=>{
                   console.log(element)
                    html=`<div class="card" style="width: 24rem;">
                    <img src="${responseBlob}" class="card-img-top" alt="...">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><b>Name:</b>    ${element.name}</li>
                      <li class="list-group-item"><b>Speciality:</b> ${element.speciality}</li>
                      <li class="list-group-item"><b>Organization:</b> ${element.organization}</li>
                    </ul>
                    <div class="card-body text-center">
                    <button class="btn btn-primary delete" name='${element.providerID}'> <i class="fa fa-trash"></i> Delete</button>
                    <button class="btn btn-primary update" name='${element.providerID}'> <i class="fa fa-eye"></i> View</button>
                    <button class="btn btn-primary update" name='${element.providerID}'> <i class="fa fa-pencil"></i> Update</button>
                  </div>
                  </div>`
                  //console.log(html)
                  ele.innerHTML+=html
                }).catch((err)=>{
                    alert("its ok")
                })
            });
        
        }).catch((err)=>{
            window.open("../error/oops.html", "_self")
            
            console.log(err)
            
        })
    }
    document.querySelector('.notNav').addEventListener('click', (event)=>{
        console.log(event.target.name)
        console.log(event.target.innerText)
        if(event.target.innerText.trim() == 'Delete')
            deleteitem(event.target.name)
        else if(event.target.innerText.trim() == 'Update')
            updateitem(event.target.name)
        else if(event.target.innerText.trim() == 'View')
            viewitem(event.target.name)
    })

    AllData()
});