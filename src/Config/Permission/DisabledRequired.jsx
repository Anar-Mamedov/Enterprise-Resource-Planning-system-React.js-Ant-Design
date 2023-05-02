const Index=()=>{
    Array.prototype.Required = function (name, message = 'Zəhmət olmasa doldurun...') {
        let required = false;
        if (Array.isArray(name)) {
            let [field, ...path] = name?.map(dat => Number.isInteger(dat) ? '*' : dat).reverse();
            path = path.reverse().join('.')
            required = this?.find(d => d?.path === path && d?.fields?.find(f => f?.field === field));
        } else {
            required = this?.find(v => !v.path)?.fields?.find(f => f?.field === name);
        }
        required = Boolean(required)
        // console.log(required);
        return required
        // return { required, message }
    }
    
    Array.prototype.Disabled = function (name) {
    
        if (!Array.isArray(name)) return Boolean(this?.find(v => !v.path)?.fields?.find(f => f?.field === name));
    
        let [field, ...path] = name?.map(dat => Number.isInteger(dat) ? '*' : dat).reverse();
        path = path.reverse().join('.')
        // console.log(Boolean(this?.find(d => d?.path === path && d?.fields?.find(f => f?.field === field))));
        return Boolean(this?.find(d => d?.path === path && d?.fields?.find(f => f?.field === field)));
    }
};

export default Index;