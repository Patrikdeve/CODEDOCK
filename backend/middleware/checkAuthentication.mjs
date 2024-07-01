

export async function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()){
        return next(); 
    }

    res.redirect(process.env.CLIENT_BASE_URL + '/login'); 
}