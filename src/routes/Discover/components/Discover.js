import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { fetchNewReleases, fetchAccessToken, fetchFeaturedPlaylists, fetchCategories } from '../../../services/api';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentDidMount() {
    try {
      const accessToken = await fetchAccessToken();
      if (accessToken) {
        const newReleases = await fetchNewReleases(accessToken);
        const playlists = await fetchFeaturedPlaylists(accessToken);
        const categories = await fetchCategories(accessToken);

        this.setState({ newReleases, playlists, categories });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
