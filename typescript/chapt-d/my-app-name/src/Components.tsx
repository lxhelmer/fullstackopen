import { CoursePart } from './App'

const Header = ({name}: { name: string }): React.JSX.Element => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = ({part}: {part: CoursePart}): React.JSX.Element => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <h2>
          {part.name}
          </h2>
          Description: {part.description}
          <br/>
          Amount of exercises:{part.exerciseCount}
        </>
    )
    case "group":
      return (
        <>
          <h2>
          {part.name}
          </h2>
          Amount of exercises:{part.exerciseCount}
          <br/>
          Amount of group projects:{part.groupProjectCount}
          <br/>
          kind: {part.kind}
        </>
    )
    case "background":
      return (
        <>
          <h2>
          {part.name}
          </h2>
          Description: {part.description}
          <br/>
          Amount of exercises:{part.exerciseCount}
          <br/>
          Background material:{part.backgroundMaterial}
          <br/>
          kind: {part.kind}
        </>
    )
    default:
      return (
        <></>
    )
  }

}

const Content = ({parts}: { parts: CoursePart[] }): React.JSX.Element => {
  return (
    <>
    <h1>
      Courses:
    </h1>
      {parts.map(p => <Part part={p}/>)}
    </>
  )
}

const Total = ({total}: {total: number}): React.JSX.Element => {
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

export { Header, Content, Total }
