import PropTypes from 'prop-types'

export const ErrorPage = ({ text = "Something went Wrong, Check Your Internet Connection and Try Again" }) => {
    return (
        <div style={{
            minHeight: 'calc(100vh - 241px)',
            height: "100%",
            display: "grid",
            placeContent: "center",
            fontSize: "2rem",
            padding: "5rem",
            textAlign: "center",
            textWrap: "balance"
        }}>{text}</div>
    )
}

ErrorPage.propTypes = {
    text: PropTypes.string
}