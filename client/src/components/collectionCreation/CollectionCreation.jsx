import React,{useState} from 'react'

export const CollectionCreation = () => {
    const [collectionText, setCollectionText]=useState({
        collectionTitle:'',
        collectionDescription:''
    })
    const [collectionPicture, setCollectionPicture]=useState(null)


    const handleFileChange=(event)=>{
        event.preventDefault();
        setCollectionPicture(event.target.files[0])
    }


    const handleTextChange=(e)=>{
        setCollectionText({
            ...collectionText,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();

        let newCollectionData= new FormData();
        newCollectionData.append('file', collectionPicture)
        newCollectionData.append('collectionTitle', collectionText.collectionTitle)
        newCollectionData.append('collectionDescription', collectionText.collectionDescription)

        console.log(newCollectionData.get('collectionTitle'))
        console.log(newCollectionData.get('file'))

        if(!collectionPicture){
            alert('Merci de sélectionner une image')
            return
        }
        try {
            console.log('submit clicked1')
            const response=await fetch('http://localhost:5000/admin/uploadCollection',{
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: newCollectionData
            })
            console.log('submit clicked2')
            if(!response.ok){
                throw new Error('Network response was not OK')
            }
            else console.log('New Entry Created Successfuly')
        } catch (err) {
            console.error('Error adding New Collection', err)
        }
    
    }

    return (
    <div>
        <h1>Créer une nouvelle Collection</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='collectionTitle'>Nom de la Collection</label> 
                <input
                    id='collectionTitle'
                    type="text"
                    name="collectionTitle"
                    onChange={handleTextChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='collectionPicture'>Choisir une image principale pour la Collection</label> 
                <input
                    id='collectionPicture'
                    type='file'
                    name='collectionPicture'
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label htmlFor='collectionDescription'>Description de la Collection</label> 
                <input
                    id='collectionDescription'
                    type='text'
                    name='collectionDescription'
                    onChange={handleTextChange}
                    required
                />
            </div>

            <button type='submit'>Créer Collection</button>
        </form>
    </div>
    )
}
