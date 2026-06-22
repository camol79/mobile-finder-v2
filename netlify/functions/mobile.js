exports.handler = async (event) => {

const data = JSON.parse(event.body);

return {
statusCode: 200,
body: JSON.stringify({
result:
`Selected Criteria:

Budget: ${data.budget}
Brand: ${data.brand}
Camera: ${data.camera}
Display: ${data.display}
RAM: ${data.ram}
Storage: ${data.storage}

Backend connected successfully.`
})
};

};