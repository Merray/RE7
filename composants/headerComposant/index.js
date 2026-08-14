import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import headerStyles from './style'

const HeaderComposant = ({ navigation }) => {

    const [utilisateur, setUtilisateur] = useState(null)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setUtilisateur(user)
        })

        return unsubscribe
    }, [])

    return (
        <View style={headerStyles.header}>

            {utilisateur ? (
                <>
                    <Text style={headerStyles.profilName}>
                        {utilisateur.displayName || utilisateur.email}
                    </Text>

                    <Image
                        source={
                            utilisateur.photoURL
                                ? { uri: utilisateur.photoURL }
                                : require('./../../assets/avatar_default.png')
                        }
                        style={headerStyles.profilImage}
                    />
                </>
            ) : (
                <>
                    <Text style={headerStyles.profilName}>
                        Invité(e)
                    </Text>

                    <TouchableOpacity
                        style={headerStyles.boutonConnexion}
                        onPress={() => navigation.navigate('connexion')}
                        activeOpacity={0.7}
                    >
                        <Text style={headerStyles.connexion}>
                            Se connecter
                        </Text>
                    </TouchableOpacity>
                </>
            )}

        </View>
    )
}

export default HeaderComposant