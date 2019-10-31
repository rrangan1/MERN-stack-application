import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";

const TextFieldInputGroup = ({
                                 type,
                                 placeholder,
                                 id,
                                 onChange,
                                 info,
                                 error
                             }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                id={id}
                onChange={onChange}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    );
};
TextFieldInputGroup.propTypes ={
    type:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    error:PropTypes.string
};
TextFieldInputGroup.propTypes.default = {
    type:'text'
};
export default TextFieldInputGroup;
