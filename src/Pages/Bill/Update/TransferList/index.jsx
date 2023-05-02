import { Transfer } from 'antd';
import { BillUpdateContext, useContext } from '../../Context/context';

const Index = () => {
    const {
        // setItem, additionValues,
        setAdditionalExpensesProducts, additionalExpensesProducts, prfDataTransferState,
        prfSelectedProducts, setPrfSelectedProducts, targetKeys, setTargetKeys
    } = useContext(BillUpdateContext)
    const onChangeTransferList = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
        let copyStoreView = [...prfSelectedProducts]
        let copyAdditional = [...additionalExpensesProducts]
        if (direction === 'right') {
            moveKeys.forEach(rightKey => {
                copyAdditional = copyAdditional?.map((r) => r?.prf?.uuid !== rightKey ? r : {
                    ...r,
                    status: true,
                })
                let isChechIncludes = prfSelectedProducts.find(obj => obj.uuid === rightKey)
                if (isChechIncludes) {
                    copyStoreView = copyStoreView.map((r, i) => {
                        if (r.uuid !== rightKey) {
                            return r;
                        } else {
                            const modifiedProducts = r.products.map((c) => ({ ...c, status: true }));
                            return { ...r, status: true, collapse: prfSelectedProducts[i].collapse, products: modifiedProducts };
                        }
                    });
                } else {
                    setPrfSelectedProducts([...prfSelectedProducts, { uuid: rightKey, status: true, collapse: true }])
                }
            })
            setAdditionalExpensesProducts([...copyAdditional])
            setPrfSelectedProducts([...copyStoreView])
        } else if (direction === 'left') {
            moveKeys.forEach(leftKey => {
                copyStoreView = copyStoreView.map((l, i) => l?.uuid !== leftKey ? l : { ...l, uuid: leftKey, status: false, collapse: prfSelectedProducts[i].collapse })
                copyAdditional = copyAdditional.map(l => l?.prf?.uuid !== leftKey ? l : { ...l, status: false })
            })
            setAdditionalExpensesProducts([...copyAdditional])
            setPrfSelectedProducts([...copyStoreView])
        }
        // additionalExpensesProducts.forEach((elem, index) => {
        //     setItem({ 'addition_expenses': { [index]: { 'prf_id': elem?.uuid } } })
        //     setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid || null } } })
        //     setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.addition_expenses_type?.uuid || null } } })
        //     setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid || null } } })
        //     setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount } } })
        //     setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number } } })
        //     setItem({ 'addition_expenses': { [index]: { 'chart_of_account': 'sdsd' } } })
        //     setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': 'sdsd' } } })
        //     setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid || null } } })
        // })
        // additionValues.forEach((el, ind) => {
        //     setItem({ 'addition_expenses': { [ind]: { 'prf_id': el?.uuid } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'supplier_id': el?.supplier?.uuid || null } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_type_id': el?.type?.uuid } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'distribution_id': el?.distribution?.uuid } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'amount': el?.amount } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_number': el?.addition_expenses_number } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'chart_of_account': 'sdsd' } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'tax_chart_of_account_id': 'sdsd' } } })
        //     setItem({ 'addition_expenses': { [ind]: { 'tax_id': el?.tax?.uuid } } })
        // })
    };
    return (
        <Transfer
            dataSource={prfDataTransferState}
            titles={['Auto-complete', 'Selected']}
            targetKeys={targetKeys}
            onChange={onChangeTransferList}
            render={(item) => item?.name}
            listStyle={{
                width: 1000,
                height: 200,
            }}
        />
    );
};
export default Index;