export default function AdminData() {

    const [isClicked, setIsClicked] = useState(false);
    const [showTag, setShowTag] = useState(false);

    const SubFunction = () => {
        return new Promise(async (resolve) => {
            var url = process.env.REACT_APP_CEO_URL
            try {
                const a = await axios.get(url)
                adminData = a.data.seller
            }
            catch (e) {
                console.log(e)
            }
            resolve();
            setShowTag(true);
        });
    }
}
async function checkadmindata(e) {

    const id = e.target.value;
    var url = process.env.REACT_APP_CEO_URL + "/admin/detail"
    try {
        const a = await axios.post(url, { id: id })
        data = a.data.data
        console.log("data :- ", data)
    }
    catch (e) {
        console.log(e)
    }
    setIsClicked(true);

}
async function adminprodctremove(e) {
    const id = e.target.value;
    var url = process.env.REACT_APP_CEO_URL + "/admin/productremove"
    try {
        const res = await axios.post(url, { id: id })
    }
    catch (e) {
        console.log(e)
    }
}