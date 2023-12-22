import { useState } from "react"
import { StyledActivityIndicator, StyledScrollView, StyledText, StyledTextInput, StyledView } from "../../helpers/NativeWind.helper"
import { searchQuery } from "../../services/user.service"
import { IPost, IUser } from "../../types/models.type"
import { SearchUserCard } from "../core/SearchUserCard"
import { PostCard } from "../core/PostCard"
import { FloatingButton } from "../core/FloatingButton"

export const SearchScreen = ({navigation}: any) => {

    const [searchText, setSearchText] = useState<string>('')
    const [users, setUsers] = useState<IUser[]>([])
    const [posts, setPosts] = useState<IPost[]>([])

    const [searching, setSearching] = useState<boolean>(false)

    const searchUpdate = (value: string) => {
        setSearchText(value)
        search(value)
    }

    const search = async (value: string) => {
        if (value.length < 3) {
            return
        }
        setSearching(true)
        const response = await searchQuery(value)
        if (response && response.error) {
            alert(response.error)
            setSearching(false)
            return
        }

        const { users, posts } = response
        setUsers(users)
        setPosts(posts)
        setSearching(false)
    }

    return (
        <StyledView className="bg-background w-full h-full">
            <FloatingButton navigation={navigation}/>
            <StyledView className="p-4">
            <StyledTextInput className="border border-white p-3 rounded-full text-white" placeholder="Search" value={searchText} onChangeText={(e) => searchUpdate(e)} onSubmitEditing={(e) => search(e.nativeEvent.text)} autoCapitalize="none" placeholderTextColor={'white'}/>
            </StyledView>
            <StyledScrollView className="mt-4 border-t border-slate-600 p-4">
                {
                    searching
                        ?
                        <StyledActivityIndicator size={"large"} className="mt-5" />
                        :
                        <>
                            {
                                users.length != 0 &&
                                <StyledView className="w-full">
                                    <StyledText className="text-white text-xl font-bold mt-4">Users</StyledText>
                                    <StyledScrollView horizontal={true} className="py-4">
                                        {
                                            users.map((user: IUser, index) => (
                                                <SearchUserCard {...user} key={index} />
                                            ))
                                        }
                                    </StyledScrollView>
                                </StyledView>
                            }
                            {
                                posts.length != 0 &&
                                <StyledView className="w-full">
                                    <StyledText className="text-white text-xl font-bold mt-4">Posts</StyledText>
                                    <StyledScrollView>
                                        {
                                            posts.map((post: IPost, index) => (
                                                <PostCard key={index} post={post} />
                                            ))
                                        }
                                    </StyledScrollView>
                                </StyledView>
                            }
                        </>

                }

            </StyledScrollView>
        </StyledView>
    )
}