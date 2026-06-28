import { useState, useEffect } from 'react'
import axios from 'axios'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
})

const MOCK_PROFILE = {
  name: 'Soumyajit Saha',
  login: 'itzsoumyajit-dev',
  bio: 'Crafting beautiful things on the web',
  avatar_url: `https://github.com/${USERNAME}.png`, // Fetch actual avatar using username
  public_repos: 15,
  followers: 12,
  following: 8,
  html_url: 'https://github.com/itzsoumyajit-dev',
}

const MOCK_REPOS = [
  { id: 1, name: 'portfolio', description: 'Personal Portfolio Website', html_url: '#', stargazers_count: 5, language: 'JavaScript' },
  { id: 2, name: 'ai-translator', description: 'Standalone AI Translator App', html_url: '#', stargazers_count: 3, language: 'JavaScript' },
  { id: 3, name: 'react-components', description: 'Collection of premium React components', html_url: '#', stargazers_count: 2, language: 'TypeScript' },
  { id: 4, name: 'terminal-theme', description: 'Dark terminal theme', html_url: '#', stargazers_count: 1, language: 'CSS' }
]

const MOCK_LANGS = {
  JavaScript: 150000,
  TypeScript: 80000,
  CSS: 30000,
  HTML: 15000
}

export function useGitHub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [languages, setLanguages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          api.get(`/users/${USERNAME}`),
          api.get(`/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ])
        setProfile(profileRes.data)
        const sorted = reposRes.data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(sorted)
        // Fetch detailed languages for top 15 repos to avoid rate limits
        const topRepos = sorted.slice(0, 15)
        const langResponses = await Promise.all(
          topRepos.map(repo => {
            if (!repo.languages_url) return { data: {} };
            return api.get(repo.languages_url).catch(() => ({ data: {} }));
          })
        )
        
        const langMap = {}
        langResponses.forEach(res => {
          if (res && res.data) {
            Object.entries(res.data).forEach(([lang, bytes]) => {
              langMap[lang] = (langMap[lang] || 0) + bytes
            })
          }
        })
        setLanguages(langMap)
      } catch (err) {
        console.warn('GitHub API request failed, using local mock data fallback. Error:', err.message)
        // Fallback to mock data so UI doesn't break during dev rate limit
        setProfile(MOCK_PROFILE)
        setRepos(MOCK_REPOS)
        setLanguages(MOCK_LANGS)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return { profile, repos, languages, loading, error }
}
