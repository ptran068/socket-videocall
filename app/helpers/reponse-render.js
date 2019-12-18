export default class ResponseRender {

    static returnRender (res, url, options) {
        return res.render(url, options);
    }
}
