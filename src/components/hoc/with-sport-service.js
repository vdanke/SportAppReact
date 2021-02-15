import React from 'react'
import SportServiceContext from "../sport-service-context"

const WithSportService = () => (Wrapped) => {
    return (props) => {
        return (
            <SportServiceContext.Consumer>
                {
                    ({authService, traineeService, coachService, postService, gymService}) => {
                        return <Wrapped 
                            {...props}
                            authService={authService} 
                            traineeService={traineeService}
                            coachService={coachService}
                            postService={postService}
                            gymService={gymService}
                        />
                    }
                }
            </SportServiceContext.Consumer>
        )
    }
}

export default WithSportService