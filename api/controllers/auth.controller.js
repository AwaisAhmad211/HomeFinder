export const register = (req,res) => {
    console.log("Register Connected");
    res.send("Register")
}
export const login = (req,res) => {
    console.log("Login Connected");
    res.send("login")

}
export const logout = (req,res) => {
    console.log("logout Connected");
    res.send("logout")

}