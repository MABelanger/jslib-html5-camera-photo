// only chrome support this.
navigator.permissions.query({ name: 'camera' })
    .then((permissionObj) => {
        console.log(permissionObj.state);
    })
    .catch((error) => {
        console.log('Got error :', error);
    })
