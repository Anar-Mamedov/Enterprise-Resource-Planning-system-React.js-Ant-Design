
import { Sorter, FilterIcon } from "../../Components"
import { Languages } from "../../Config";
const innerText = Languages.SelectLanguage("BankingTransactions");

const columns = [
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        fixed: 'left',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[0]} onClick={_ => console.log(0)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(0)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[1]} onClick={_ => console.log(1)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(1)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[2]} onClick={_ => console.log(2)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(2)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[3]} onClick={_ => console.log(3)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(3)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 200,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[4]} onClick={_ => console.log(4)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(4)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[5]} onClick={_ => console.log(5)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(5)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 200,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[6]} onClick={_ => console.log(6)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(6)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[7]} onClick={_ => console.log(7)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(7)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[8]} onClick={_ => console.log(8)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(8)} />
    },
    {
        dataIndex: '',
        ellipsis: false,
        width: 150,
        align: 'center',
        sorter: { multiple: 0 },
        title: <Sorter title={innerText.table[9]} onClick={_ => console.log(9)} />,
        filterDropdown: true,
        filterIcon: <FilterIcon onClick={_ => console.log(9)} />
    }

]

export default columns