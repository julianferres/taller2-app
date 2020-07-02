import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00335c",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 45,
        color: "white",
        marginBottom: 40,
    },
    inputText: {
        height: 50,
        color: "white",
    },
    forgot: {
        color: "white",
        fontSize: 12,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: "white",
        fontSize: 16,
    },
    forgotPasswordLogo:{
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 35,
        color: "white",
        marginBottom: 40,
    },
    pickImage:{
        width: "80%",
        backgroundColor: "#265881",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        flexDirection: "row"
    },
    imagePickerText: {
        color: "white",
        fontSize: 16,
        paddingRight: 10
    },
    activityIndicator:{
        paddingTop: 15
    }
});