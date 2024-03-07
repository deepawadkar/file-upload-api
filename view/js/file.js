var formData = new FormData()

//FILE SELECT ON CHANGE OF INPUT
document.getElementById("myfile").addEventListener("change", async (e) => {
    e.preventDefault()
    console.log('file', e.target.files[0])
    formData.append("myfile", e.target.files[0])
});

//upload logic
document.getElementById("fileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(`formdata =`, formData)
    await fetch(`/api/file/upload`, {
        method:"POST",
        body: formData
    }).then(res => res.json())
    .then(res => {
            alert(res.msg)
            window.location.href="/"
        }).catch(err => console.log(err.msg))
    })