import ResponseRender from '../helpers/reponse-render';

async function getHome(req, res) {
    const { user} = req
    // console.log(user);
    if (!user) {
        return ResponseRender.returnRender(res,'login', null)
    }

    return ResponseRender.returnRender(res, 'home', null)
}

export default {
    getHome
}