export const manipulateCloudinaryImage = (url, options = ['f_auto', 'q_70', 'w_512']) => {
    let imageVersion, imageName

    if (url) {
        imageVersion = url.split('/')[6]
        imageName = url.split('/')[7].split('.')[0]
    }

    return `https://res.cloudinary.com/dze3eqnby/image/upload/${options.join(',')}/${imageVersion}/${imageName}.jpg`
}