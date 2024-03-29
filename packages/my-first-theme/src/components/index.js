import React from "react";
import { connect, Global, css, styled, Head } from "frontity";
import Link from "@frontity/components/link";
import Switch from "@frontity/components/switch";
import List from "./list";
import Post from "./post";
import Page from "./page";
import Loading from "./loading";
import Error from "./error";


const Root = ({ state, actions }) => {
  const data = state.source.get(state.router.link)

  return (
    <>
    <Global
        styles={css`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            html{
                font-family: system-ui, Verdana, Arial, sans-serif;
            }
        `}
    />
    <Head>
        <title>My First Frontity Theme</title>
        <meta
            name="description"
            content="Based on the Frontity step by step tutorial"
        />
    </Head>
    <Header isPostType={data.isPostType} isPage={data.isPage}>
        <HeaderContent>
            <h1>Hello Frontity</h1>
            { 
                state.theme.isUrlVisible ? (
                    <>
                        Current URL: {state.router.link}{" "} 
                        <Button onClick={actions.theme.toggleUrl}>&#x3c; Hide URL</Button>
                    </>
                ) : (
                    <Button onClick={actions.theme.toggleUrl}>Show URL &#x3e;</Button>
                )
            }
            <Menu>
                <Link link="/">Home</Link>
                <Link link="/destinations">Destinations</Link>
                <Link link="/about-us">About Us</Link>
            </Menu>
        </HeaderContent>
    </Header>
    <Main>
        <Switch>
            <Loading when={data.isFetching} />
            <List when={data.isArchive} />
            <Post when={data.isPost} />
            <Page when={data.isPage} />
            <Page when={data.isDestinations} />
            <Error when={data.isError} />
        </Switch>
    </Main>
    </>
  )
}
export default connect(Root)

const Header = styled.header`
  background-color: #333333;
  border-width: 0 0 8px 0;
  border-style: solid;
  border-color: ${ props => props.isPostType ? ( props.isPage ? 'lightsteelblue' : 'lightseagreen' ) : 'maroon'};

  h1{
      color: white;
      font-size: 6em;
  }
`
const HeaderContent = styled.div`
  max-width: 100%;
  padding: 10em 5em; 
  margin: auto;
  background-image: url(https://www.ntounas.gr/wp-content/uploads/2020/01/20190927_222749.jpg);
  background-position: center center;
  background-size: cover;
  color: white;
`
const Main = styled.main`
  max-width: 100%; 
  padding: 5em;
  margin: auto;

  img{
      max-width: 100%;
  }

  h2{
      margin: 0.5em 0;
  }
  p{
      line-height: 1.25em;
      margin-bottom: 0.75em;
  }
  figcaption{
      color: #828282;
      font-size: 0.8em;
      margin-bottom: 1em;
  }
`

const Menu = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  & > a{
      margin-right: 1em;
      color: white;
      text-decoration: none;
      font-weight: 700;
  }
  & > a:hover{
      color: #333333;
  }
`

const Button = styled.button `
background: transparent;
border: none;


:hover {
    cursor: pointer;
    color: #333333;
}
`