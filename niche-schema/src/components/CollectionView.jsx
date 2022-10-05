import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

export const CollectionView = () => (
    <Grid columns={3} divided>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )