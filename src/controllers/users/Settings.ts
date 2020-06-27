import Responses from "../../utils/Responses";
import Logger from "../../logging/Logger";
import API from "../../api/API";

const FormData = require('form-data');

const axios = require("request");
const config = require("../../config/config.json");

export default class Settings {
    public static async GET(req: any, res: any): Promise<void> {
        try {


            Responses.Send(req, res, "user/settings", `Settings | Quaver`, {});
        } catch (err) {
            Logger.Error(err);
            Responses.ReturnUserNotFound(req, res);
        }
    }

    public static async POST(req: any, res: any): Promise<void> {
        try {
            const token = await API.GetToken(req);

            let headers: any = {};

            if (token)
                headers["Authorization"] = `Bearer ${token}`;

            headers["Content-Type"] = "multipart/form-data";
            headers["Accept"] = 'application/json';
            console.log(req.files.profile_cover.data.toString());

            // let form = new FormData();
            // form.append("cover", req.files.profile_cover);


            // const response = await axios.post(`${config.apiBaseUrl}/v1/users/profile/cover`, {
            //     cover: req.files.profile_cover
            // }, {
            //     headers: headers
            // }).catch((e: { response: any; }) => {
            //     console.log(e.response);
            //     res.redirect(404, `/settings`);
            //     return;
            // });

            // console.log(response);

            var form = new FormData();
            form.append('my_field', 'cover');
            form.append('my_buffer', req.files.profile_cover.data);
            form.append('my_file', req.files.profile_cover.data);

            axios.post({
                url: `${config.apiBaseUrl}/v1/users/profile/cover`,
                form: form,
                headers: headers
            }, function (error, response, body) {
                console.log(error);
            });

            res.redirect(301, `/settings`);
        } catch (err) {
            Logger.Error(err);
            Responses.Return500(req, res);
        }
    }
}