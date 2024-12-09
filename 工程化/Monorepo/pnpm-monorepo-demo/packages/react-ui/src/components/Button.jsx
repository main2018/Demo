import './Button.css';
export default function Button ({ type, children }) {
    let _type = 'primary';

    if ([
        'primary',
        'success',
        'warn',
        'danger'
    ].includes(type)) {
        _type = type;
    }

    return <button className={ _type }>{ children }</button>
}