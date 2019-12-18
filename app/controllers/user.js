import User from '../models/user';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import ResponseHandler from '../helpers/response-handler';
import ResponseRender from '../helpers/reponse-render';
import key from '../config/index'

async function getLoginPage(req, res) {
    return ResponseRender.returnRender(res, 'login', null)
}

async function addUser (req, res, next) {
    try {
    const avatar = req.file.filename
    const { name, email, password } = req.body;
        const hash = bcrypt.hashSync(password, 10);
        console.log(hash);
        
        const user = new User({
            name,
            email,
            avatar,
            password: hash
        });
        await user.save();

        return ResponseHandler.returnSuccess(res, null)
        
    } catch (e) {
        return next(e);
    }
}


async function login (req, res, next) {
    try {
        const { email , password } = req.body;
        if (!email) {
            return next(new Error('Email is empty'));
        }
        if (!password) {
            return next(new Error('Password is empty'));
        }
        // const hash = bcrypt.hashSync(password, saltRounds);
        const user = await User.findOne({ email }).lean(true);
        if (!user) {
            return next(new Error('Password is not correct'));
        }
        const isCorrectPassword = bcrypt.compareSync(password, user.password) ;
        if (!isCorrectPassword) {
            return next(new Error('Password is not correct'));
        }

        const token = await JWT.sign(user, key.secret);
        delete user.password;
        req.session.user = user;

        return ResponseRender.returnRender(res, 'home', null)
    } catch (e) {
        console.log(e);
        return ResponseHandler.returnError(res, e);
    }
}

async function updateName (req, res, next) {
    try {
        const id = req.user._id;
        const {  name } = req.body;
        const user = await User.findByIdAndUpdate(id, { name: name }).select('name _id');
        if (!user) {
            return next(new Error('User is not found'));
        } 
        return  ResponseRender.returnRender(res, 'pages/account-setting-1', user);

    } catch (e) {
        return next(e);
    }
}

async function updatePass (req, res, next) {
    try {
        const id = req.user._id;
        
        const {   password, passwordConfirm } = req.body;
        if (!id) {
            return next(new Error('You must login to do this'));
        }
        const user = await User.findById(id).select('password').lean(true);
        if (!user) {
            return next(new Error('User is not found'));
        }
        const isCorrectPassword = await bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {
            return next(new Error('Old Password is not correct'));
        }
        const hash = bcrypt.hashSync(passwordConfirm, 10);    
        await User.update({ _id: id }, { $set: { password: hash } });         
        return  ResponseRender.returnRender(res, 'pages/account-setting-password', user);

    } catch (e) {
        return next(e);
    }
}

async function upAvatar (req, res, next) {
    try {
        const  userId = req.user._id;
        const userUpload = await User.findById(userId);
        if (!userUpload) {
            return next(new Error('User is not found'));
        }
        const img = req.file.filename;
        userUpload.avatar = img;
        await userUpload.save();
        return ResponseRender.returnRender(res, 'pages/account-setting-1', userUpload);
    
    } catch (e) {
        return next(e);
    }
} 

async function upAvatarChannel (req, res, next) {
    try {
        const  id = req.params.id;
        const chanel = await Chanel.findById(id);
        if (!chanel) {
            return next(new Error('User is not found'));
        }
        const img = req.file.filename;
        chanel.thumbnail = img;
        await chanel.save();
        return res.json({
            message: 'successfully'
        });
    
    } catch (e) {
        return next(e);
    }
} 

async function logout (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
            return next(err);
            } else {
            return res.redirect('/user/login');
            }
        });
        }
}


export default {
    login,
    addUser,
    logout,
    upAvatar,
    upAvatarChannel,
    updateName,
    updatePass,
    getLoginPage
}
