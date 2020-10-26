import React from 'react';
import { StyleSheet, ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import CustomCards from '../Components/CustomCard';
import {connect} from 'react-redux';
import {levelContentRequest} from '../actions/index'
function UserHome(props){
  const { levels } = props
  const [loading,setLoading] = React.useState(false)
  const handleClick = (l) =>{
  setLoading(true)
    props.getLevelContents({
      "fk_languageId":1,
      "fk_levelId":l 
    })
  }
  React.useEffect(() =>{
    if (props.levelContent.STS === "200") {
      setLoading(false)
      props.navigation.navigate("levelDetail")
    }
  },[props.levelContent])
  
    return (   
        <>
                <CustomHeader {...props} title="Kannada"/>
              <ScrollView style={styles.containerView}>
                      {
                        levels.CONTENT.map(level =>(
                          <TouchableOpacity 
                            key={level.levelId}
                            onPress={() => handleClick(level.levelId)}
                            disabled={loading?true:false}
                          >
                            <CustomCards 
                              title={level.categoryName}
                              maxScore={level.levelMaxScore}
                            />
                          </TouchableOpacity>
                        ))
                      }
                  {loading ? 
                      (
                        
                            <ActivityIndicator
                              size="large"
                              color="#c2be46"
                              style={styles.activityStyle}
                            />
                          )
                        : null}
                    </ScrollView>
        </>
      
    )
}

const mapStateToProps =(state) =>{
  return {
    levels:state.levelsData,
    levelContent:state.levelContent
  }
}

const mapDispatchToProps =(dispatch) =>({
  getLevelContents:(data) =>dispatch(levelContentRequest(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserHome);

const styles  = StyleSheet.create({
  containerView:{
    backgroundColor: "#d7d8db",
    height:"100%"
  },
  activityStyle: {
    position: "absolute",
    top: "50%",
    left: "45%",
    zIndex:1
  }
})