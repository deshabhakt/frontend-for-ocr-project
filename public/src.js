const makeDivOpenUploadBox = () => {
    const upload_image_input = document.getElementById("upload_image_input")
    upload_image_input.click()
}

const radioButtonListener = (event) => {
    const input_type = event.target.value
    localStorage.setItem('input-type', input_type)
    console.log(input_type)
}




const setThumbnail = function (event) {

    const uploaded_image_json = event.target.files[0]
    const src = URL.createObjectURL(uploaded_image_json)
    
    const thumbnail = document.getElementById('upload_image_placeholder')
    thumbnail.src = src

    thumbnail.style.height = '60px'
    thumbnail.style.width = '180px'

    const thumbnail_footer = document.getElementById('select_photo_para')
    thumbnail_footer.innerText = uploaded_image_json.name
    const image_name = uploaded_image_json.name

    localStorage.setItem('uploaded_image_name', image_name)

    const reader = new FileReader()
    reader.addEventListener('load', () => {
        localStorage.setItem("uploaded_image", reader.result);

    })
    reader.readAsDataURL(uploaded_image_json)
}


const onFormSubmit = (event) => {
    event.preventDefault()
    const uploaded_image = localStorage.getItem('uploaded_image')
    const uploaded_image_name = localStorage.getItem('uploaded_image_name')
    const input_type = localStorage.getItem('input-type')
    const payload = JSON.stringify({
        'base64image': uploaded_image,
        'image_name': uploaded_image_name,
        'input_type':input_type
    })

    console.log("Payload ",payload)

    // const formData = new FormData(upload_image_input);

    axios
        .post("http://localhost:5000/upload", payload, {
            headers: {
                "Content-Type": "string",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((res) => {
            
            console.log("response", res);
            
            predicted_text = res.data.predicted_text

            document.getElementById("result").innerHTML = '<div  class="flex justify-center py-10 mt-1"><div class="flex justify-center py-5 mt-1 rounded-lg shadow-xl bg-gray-50 lg:w-1/2 flex p-2 space-x-4 my-4 w-80"><h1 id="predicted_text">' + predicted_text + '</h1></div></div>'

            const predicted_text_html = document.getElementById("predicted_text")

            predicted_text_html.style.color = 'green'
            predicted_text_html.style['font-size'] = '28px'
            predicted_text_html.style['text-align'] = 'center'
            predicted_text_html.style.fontWeight = '600'
        })
        .catch((err) => {
            console.log(err);
        });   
}

// const handleImageUpload = (event) => {
//     event.preventDefault()
    

//     const uploaded_image = localStorage.getItem('uploaded_image')
//     const uploaded_image_format = localStorage.getItem('uploaded_image_format')
    
//     console.log("logging from submit handler", uploaded_image, uploaded_image.length)
    
//     $.ajax({
//         url: 'http://127.0.0.1:5000/upload',
//         contentType: 'string',
//         processData: false, // Important to keep file as is
//         data: JSON.stringify({
//             'base64image': uploaded_image,
//             'format': uploaded_image_format
//         }),
//         type: 'POST',
//         headers: {
//             "Content-Type": "multipart/form-data",
//             'Access-Control-Allow-Origin': '*'
//         },
//         success: function (response) {
//             console.log(response);
//             document.getElementById("result").innerHTML = '<div  class="flex justify-center py-10 mt-1"><div class="flex justify-center py-5 mt-1 rounded-lg shadow-xl bg-gray-50 lg:w-1/2 flex p-2 space-x-4 my-4"><h1 id="predicted_text">' + response.data + '</h1></div></div>'

//             const predicted_text_html = document.getElementById("predicted_text")

//             predicted_text_html.style.color = 'green'
//             predicted_text_html.style['font-size'] = '28px'
//             predicted_text_html.style['text-align'] = 'center'
//             predicted_text_html.style.fontWeight = '600'

//         }
//     });
// }