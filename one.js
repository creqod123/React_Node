useEffect(() => {
    if (props.socket) {
        props.socket.on('hello', res => {
            console.log('Check res :- ', res);
        })
    }
}, [])

321723