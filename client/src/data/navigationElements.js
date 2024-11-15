import image1 from '/images/Static_images/Collections/porcelaine.jpg'
import image2 from '/images/Static_images/Collections/terracota.jpg'
import image3 from '/images/Static_images/Collections/terremoto.jpg'

export const navigationElements=[
    {
        id:1,
        picture:image1,
        picDescription:'image 1',
        navigation:'/collections',
        buttonName: 'Voir les collections'
    },
    {   
        id:2,
        picture:image2,
        picDescription:'image 2',
        navigation:'/galerie',
        buttonName: 'Voir la galerie'
    },
    {
        id:3,
        picture:image3,
        picDescription:'image 4',
        navigation:'/portrait',
        buttonName: 'Voir le portrait'
    },
]
