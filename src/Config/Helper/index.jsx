const Index=()=>{
    String.prototype.splitMap = function (point) {
        return this.split(point).map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
    }
};

export default Index;