function displayObject (object) {
    // console.log(`toi ten la ${object.name} , ${object.age} tuoi, song tai ${object.address}`);
    console.log(JSON.stringify(object));
}

module.exports = {displayObject};