
const [first, setFirst] = useState(false);
const [second, setSecond] = useState(false);

const restBtn = () => {
    if (true) {
        setFirst(''); 
        setSecond('');
    }
}

<div className="calc">
    FIRST<input type="number" placeholder="first" onChange={(e) => { setFirst(e.target.value) }} />
    SECOND<input type="number" placeholder="second" onChange={(e) => { setSecond(e.target.value) }} />
    F * S<input value={first * second} />
    F * S / 9<input value={(first * second / 9).toFixed(2)} />
    F - S<input value={(first - second)} />
    F / 2<input value={(first / 2)} />
</div>
