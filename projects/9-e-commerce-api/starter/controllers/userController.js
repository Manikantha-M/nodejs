const getAllUsers = async (req, res) => {
    res.send('Get all users route');
}

const getSingleUser = async (req, res) => {
    res.send('getSingleUsers');
}

const showCurrentUser = async (req, res) => {
    res.send('showCurrentUser');
}

const updateUser = async (req, res) => {
    res.send('updateUser');
}

const updateUserPassword = async (req, res) => {
    res.send('updateUserPassword');
}

module.exports = {
    getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword
}