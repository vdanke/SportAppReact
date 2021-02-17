import React from 'react'
import SportServiceContext from "../sport-service-context"

const WithSportService = () => (Wrapped) => {
    return (props) => {
        return (
            <SportServiceContext.Consumer>
                {
                    ({authService, traineeService, coachService, postService, gymService, categoryService}) => {
                        return <Wrapped 
                            {...props}
                            authService={authService} 
                            traineeService={traineeService}
                            coachService={coachService}
                            postService={postService}
                            gymService={gymService}
                            categoryService={categoryService}
                        />
                    }
                }
            </SportServiceContext.Consumer>
        )
    }
}

export default WithSportService